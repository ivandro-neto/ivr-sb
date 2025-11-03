import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Certifique-se de importar a conexão com o banco
import { UUID } from "crypto";

export class Customer extends Model {
  public id!: UUID;
  public phone_number!: string;
  public name!: string;
  public gender!: "M" | "F";
  public managerId!: UUID;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["M", "F"],
      allowNull: false,
    },
    managerId: {
      type: DataTypes.UUID,
      references: "managers",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "customers",
    schema: "dbo", // Adicione o schema correto
    timestamps: false,
  }
);

export default Customer;
