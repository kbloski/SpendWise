import { sequelize } from "../utils/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import UserType from "../types/UserType";


export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserType{
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true - // comment for development
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Password is needed"},
                notEmpty: { msg: "Please provide a password"}
            }

        }
    }, {
        sequelize,
        timestamps: false
    }
)