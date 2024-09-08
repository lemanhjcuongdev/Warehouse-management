"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const ExportOrderDetails_1 = require("../models/entities/ExportOrderDetails");
const ExportOrders_1 = require("../models/entities/ExportOrders");
const ExportReceipts_1 = require("../models/entities/ExportReceipts");
const Goods_1 = require("../models/entities/Goods");
const GoodsGroups_1 = require("../models/entities/GoodsGroups");
const GoodsTypes_1 = require("../models/entities/GoodsTypes");
const GoodsUnits_1 = require("../models/entities/GoodsUnits");
const ImportOrderDetails_1 = require("../models/entities/ImportOrderDetails");
const ImportOrders_1 = require("../models/entities/ImportOrders");
const ImportReceipts_1 = require("../models/entities/ImportReceipts");
const PermissionDetails_1 = require("../models/entities/PermissionDetails");
const Permissions_1 = require("../models/entities/Permissions");
const Providers_1 = require("../models/entities/Providers");
const StocktakingDetails_1 = require("../models/entities/StocktakingDetails");
const StocktakingReceipts_1 = require("../models/entities/StocktakingReceipts");
const TransportDetails_1 = require("../models/entities/TransportDetails");
const TransportReceipts_1 = require("../models/entities/TransportReceipts");
const Users_1 = require("../models/entities/Users");
const Warehouses_1 = require("../models/entities/Warehouses");
dotenv_1.default.config();
exports.appDataSource = new typeorm_1.DataSource({
  type: 'mysql',
  host: process.env.MYSQL_ADDON_HOST,
  port: Number(process.env.MYSQL_ADDON_PORT),
  username: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  synchronize: false,
  logging: true,
  entities: [
    Users_1.Users,
    Warehouses_1.Warehouses,
    TransportReceipts_1.TransportReceipts,
    TransportDetails_1.TransportDetails,
    StocktakingReceipts_1.StocktakingReceipts,
    StocktakingDetails_1.StocktakingDetails,
    Providers_1.Providers,
    Permissions_1.Permissions,
    PermissionDetails_1.PermissionDetails,
    ImportReceipts_1.ImportReceipts,
    ImportOrders_1.ImportOrders,
    ImportOrderDetails_1.ImportOrderDetails,
    Goods_1.Goods,
    GoodsGroups_1.GoodsGroups,
    GoodsTypes_1.GoodsTypes,
    GoodsUnits_1.GoodsUnits,
    ExportReceipts_1.ExportReceipts,
    ExportOrders_1.ExportOrders,
    ExportOrderDetails_1.ExportOrderDetails
  ],
  subscribers: [],
  migrations: []
});
