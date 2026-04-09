## Database > RDS for PostgreSQL > DB Security Group

## DB Security Groups

DB security groups are used to protect DB instances by controlling the inbound and outbound traffic of DB instances. Use a 'positive security model' that allows the traffic specified by the rule and blocks the rest of the traffic. If you do not associate a DB security group with the DB instance, all inbound and outbound traffic is not allowed and you cannot communicate. Even if you create a DB security group, the rules in the DB security group will not take effect unless you apply them to a DB instance. You can apply multiple DB security groups to DB instance. Main characteristics of DB security group are as follows.

* Because DB security groups act as 'stateful', sessions once connected by DB security rules are allowed even if there are no rules in the opposite direction.
* For example, if the first packet on TCP 5432 destined for the DB instance was passed under the 'inbound TCP PORT 5in432' rule, the packet sent from the DB instance to the TCP 5432 port is not blocked.
* However, packets in the opposite direction are also blocked when the session expires because no packets meet the rule for a certain period of time are received.
* It is more efficient to range DB security rules than to add them one by one. If DB security rules increase, the performance might degrade.
* Traffic that is out of state of the session may be blocked.

DB security groups consist of names, descriptions, and a number of DB security rules and the names of DB security groups have the following restrictions.

* Name of DB security group must be unique for each region.
* DB security group names can only contain alphabets between 1 and 100 characters, numbers, and some symbols (-, _, .), and the first letter can only be an alphabetic character.

### Apply DB Security Groups

When you create DB instance, you can select DB security group to apply. You can apply multiple DB security groups to DB instance. The rules of all applied DB security groups are applied to DB instance. The applied DB instance can be changed freely on Modify DB instance screen.

## DB Security Rules

You can create multiple DB security rules in a single DB security group. When you set up DB security group on DB instance, all DB security rules created for that DB security group are applied.

| Items       | Description                                                                                                                                                                                                                                                                                         |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Direction   | Inbound refers to the direction that flows into the DB instance. Outbound refers to the direction that flows out of the DB instance.                                                                                                                                                                |
| Ether Type  | It refers to the version of EtherType IP You can specify IPv4 or IPv6.                                                                                                                                                                                                                              |
| Port        | Set the port to which the rule applies. You can enter a single port or a range of ports, and also can select a DB port. When you select a DB port, the DB port for the DB instance is automatically entered.                                                                                        |
| Remote      | You can specify a range of IP addresses. If the direction of the rule is 'outbound', the destination is remote, and if it is 'inbound,' the origin is remote.<br/>Depending on the direction of the rule, compare whether the origin and destination of the traffic are set IP addresses or ranges. |
| Description | You can add a description of DB security group rules.                                                                                                                                                                                                                                               |

### Change DB Security Rules

When changes occur, such as creating, modifying, or deleting DB security rules, the changes are applied sequentially to DB instances connected with DB security groups. You cannot add new DB security rules to DB security group or modify or delete other DB security rules until they are applied to all DB instances connected with the DB security group.