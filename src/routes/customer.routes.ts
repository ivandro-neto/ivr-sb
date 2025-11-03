import { Router } from "express";
import { getCustomerInfo } from "../controller/customer.controller";

const customerRouter = Router();

customerRouter.post("/ivr/info", getCustomerInfo);
/* customerRouter.post("/ivr/plan", getActivePlan);
customerRouter.post("/ivr/plan/active", activePlan);
customerRouter.post("/ivr/send", TransferCredits);
customerRouter.post("/ivr/balance/add", AddCredits); */

export default customerRouter;
