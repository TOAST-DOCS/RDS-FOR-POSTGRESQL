import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const baseDir = __dirname;
const languages = ['ko', 'en', 'ja'];

const configs = fs.readdirSync(path.join(baseDir, 'config'))
    .filter(file => file.endsWith('.json'))
    .map(file => {
        return JSON.parse(fs.readFileSync(path.join(baseDir, 'config', file), 'utf-8'));
    });
const envs = Array.from(new Set(configs.map(config => config.env)))

for (const config of configs) {
    for (const lang of languages) {
        for (const docFile of fs.readdirSync(path.join(baseDir, 'templates', lang))) {
            const doc = path.parse(docFile).name
            if (config.exclusionDocs.indexOf(doc) >= 0) {
                continue;
            }

            // 환경에 특화된 문서인 경우 env가 일치해야 처리하도록 함
            const matchedEnv = envs.find(env => doc.endsWith(env));
            if (matchedEnv && matchedEnv !== config.env) {
                continue;
            }

            const template = fs.readFileSync(path.join(baseDir, 'templates', lang, `${doc}.md`), 'utf-8');
            const fileName = config.env === 'public' || matchedEnv ? `${doc}.md` : `${doc}-${config.env}.md`;
            const compiled = Handlebars.compile(template);
            let result = compiled({...config, lang});

            if (config.env !== 'public') {
                // [text](link-menu/) 혹은 [text](link-menu/#tag) 형식을 [text](link-menu-env/) 형식으로 교체
                result = result.replace(/\[(.*)]\((?!.*png)(?!#)(?!http)([^)]*?)(\/#[^)]*|\/)\)/g, `[$1]($2-${config.env}$3)`);
            }

            fs.writeFileSync(`${lang}/${fileName}`, result);
            console.log(`${config.engine}/${lang}/${fileName} created`);
        }
    }
}
