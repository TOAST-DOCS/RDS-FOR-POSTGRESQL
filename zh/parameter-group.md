## Database > RDS for PostgreSQL > Parameter Group

## Parameter Group

RDS for PostgreSQL provides the parameter group feature to apply the settings of PostgreSQL installed on a DB instance. A parameter group is a set of parameters for which PostgreSQL can be set. Parameter groups provides a group of default parameters for each version of all DB engines upon service activation. Default parameter group is `default.{DB Engine Version Name}` and consists of the recommended default parameter values for each version. You can modify or delete a default parameter group the same as a normal parameter group.

### Create a Parameter Group

You can create parameter groups from the console as needed. Parameter groups are created by DB engine version and can be named, with the following restrictions.

* Name of parameter group has to be unique for each region.
* Parameter group names can only contain alphabets between 1 and 100 characters, numbers, and some symbols (-, _, .), and the first letter must be an alphabetic character.

When you create a parameter group, the parameter is always generated by default. To generate based on an existing parameter group, you must use the Copy Parameters feature to create the parameter group.

### Copy a Parameter Group

Creates a new parameter group based on an existing parameter group. The new copied parameter group consists of the parameter values from the original parameter group. There is no relations between the original parameter group and the copied parameter group and changes and deletions of the original parameter group have no effect on the copied parameter group.

### Reset a Parameter Group

Once resetting the parameter group, it changes the values of all the parameters to the default values of the DB engine version.

### Apply a Parameter Group

When you create or modify DB instance, you can select a parameter group to apply to DB instance. One parameter group is applied to one DB instance, and one parameter group can be applied to multiple DB instances. If a parameter in a parameter group changes, those changes do not immediately apply to DB instances. If a connected DB instance exists, the parameter group changes to `Need to Apply`. On DB Instances list dashboard, you can select a DB instance connected with a parameter group and click **Apply Parameter Group Changes** to reflect the parameter changes to the DB instance. When changes to the parameter group are applied to all connected DB instances, the parameter group changes to `Applied`.

> [Caution]
> DB instances are restarted during the application process if the parameters that require restart have changed.

### Compare Parameter Groups

Select two different parameter groups from the console and click **Compare** to see what the parameters are different. You can compare parameter groups of different DB engine versions as well as the same DB engine.

### Delete a Parameter Group

You can delete it freely except for the parameter group that is being applied to the DB instance. To delete a parameter group that is being applied to a DB instance, you must first change the parameter group of all connected DB instances before deleting it.

## Parameters

Parameters have the following information:

| Items          | Description                                                                                                                                                                                                           |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name           | It is the name of the option in the option file (postgresql.conf).                                                                                                                                                    |
| Value          | The value to be applied to the parameter.                                                                                                                                                                             |
| Allowed values | A range of values that can be applied to the parameter.                                                                                                                                                               |
| Applied type   | Either `static` or `dynamic.`<br/>If set to `Static,` the DB instance must be restarted to apply changes to the parameter.<br/>If set to `Dynamic,` the parameter is applied immediately without DB instance restart. |
| Data type      | The type of the parameter value.                                                                                                                                                                                      | 
| Use formulas   | Indicates whether or not the formula is available for use                                                                                                                                                             |

### Parameter variables, formulas and functions

It may be better to express certain parameters as formulas using values associated with DB instances rather than using fixed values. To support this, pre-defined variables, formulas and functions are available for `NUMERIC` data format.

* Formulas
    * `()`, `+`, `-`, `*`, `/` can be used.
    * Result of Formulas must always be a number.
    * Round to the ninth decimal place if the data format is `NUMERIC`.
* Functions
    * `max(a, b, ...)`: Returns the largest of multiple values.
    * `min(a, b, ...)`: Returns the smallest of multiple values.
    * `sum([a, b, ...])`: Returns the sum of multiple values.
* Variables
    * `ramSizeByte`: Indicates byte value of the memory size of the current DB instance type.
    * `storageSizeByte`: Indicates byte value of the current DB instance data storage size.
    * `vCPU`: Indicates the number of virtual CPU cores of the current DB instance type.
    * `dbPort`: Indicates the DB port of the current DB instance.
    * `serverId`: Indicates the server ID that assigned to the current DB instance.

The example below shows how to set the DB instance type to a size of 6/10 of the memory size.

```
ramSizeByte * 6 / 10
```

### Change Parameters

You can change the parameters by selecting a parameter group from the console and clicking on **Edit Parameter**. Parameters that cannot be changed are shown as plain text and parameters that can be changed are shown as INPUTs that can be changed. If you click **Preview Changes** on Edit screen, you will see a separate pop-up window where you can check the changed parameters and if you click **Reset** you can revert to before making the changes. All values changed in edit mode must be clicked on **Save Changes** to be reflected in the parameter group. For reflection of DB instances of changed parameter groups, see [Apply Parameter Group](parameter-group/#_5).

### Change the `max_connections` Parameter

When changing the `max_connections` value with read replicas added, there is an issue with the order of application. If you only change the value on the master, you cannot apply it to a value larger than the read replica, because the value on the master must be set to a smaller value than the read replica. For the same reason, if you only change the value on the read replica, you cannot apply it to a value smaller than the master. It is recommended to apply it globally on a DB instance group basis if necessary.

### Change the `shared_buffers` Parameter

For the `shared_buffers` parameter, using an excessively large value can cause problems running the DB engine. To avoid this problem, RDS for PostgreSQL optimizes according to the RAM size of the DB instance at the time the parameter is applied (50% of the maximum RAM size).