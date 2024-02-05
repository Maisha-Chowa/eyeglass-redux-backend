import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";


const globalErrorHandler: ErrorRequestHandler = (
  error,
  req:Request,
  res:Response,
  next: NextFunction
) =>{
config.env === 'development'?
console.log(`Global error handler...`,{error})
: errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

}