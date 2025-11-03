import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Certifique-se de importar a conexão com o banco
import { UUID } from "crypto";

export class Manager extends Model {
  public id!: UUID;
  public name!: string;
  public gender! : "M" | "F";
  public extension!: number;
}

Manager.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
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
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1000,
        max: 9999
      }
    },
  },
  {
    sequelize,
    tableName: "managers",
    schema: "dbo", // Adicione o schema correto
    timestamps: false,
  }
);

export default Manager;
