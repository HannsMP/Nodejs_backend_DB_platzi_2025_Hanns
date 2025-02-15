  const boom = require('@hapi/boom');

  /** @typedef {import('../../structure')} Structure */
/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
/** @typedef {import('express').NextFunction} NextFunction */
/** @typedef {import('express').ErrorRequestHandler} ErrorRequestHandler */


/** @typedef {(this:Structure, req:Request, res:Response, next?:NextFunction)=>never} RouteReq */
/** @typedef {(this:Structure, err:ErrorRequestHandler, req:Request, res:Response, next?:NextFunction)=>never} RouteErr */

class Route {

  data = {
    /** @type {RouteReq[]}  */
    USE: [],
    /** @type {RouteReq[]}  */
    GET: [],
    /** @type {RouteReq[]}  */
    POST: [],
    /** @type {RouteReq[]}  */
    PUT: [],
    /** @type {RouteReq[]}  */
    PATCH: [],
    /** @type {RouteReq[]}  */
    DELETE: []
  }

  constructor(endPoint = '/', state = true) {
    this.endPoint = endPoint;
    this.state = state;
  }

  /** @param {Structure} structure  */
  bind(structure) {
    this.data.USE = this.data.USE.map(r => r.bind(structure));
    this.data.GET = this.data.GET.map(r => r.bind(structure));
    this.data.POST = this.data.POST.map(r => r.bind(structure));
    this.data.PUT = this.data.PUT.map(r => r.bind(structure));
    this.data.PATCH = this.data.PATCH.map(r => r.bind(structure));
    this.data.DELETE = this.data.DELETE.map(r => r.bind(structure));
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  use(...route) {
    this.data.USE.push(...route);
    return this;
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  get(...route) {
    this.data.GET.push(...route);
    return this;
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  post(...route) {
    this.data.GET.push(...route);
    return this;
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  put(...route) {
    this.data.GET.push(...route);
    return this;
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  patch(...route) {
    this.data.GET.push(...route);
    return this;
  }

  /** @param {...(RouteReq|RouteErr)} route  */
  delete(...route) {
    this.data.GET.push(...route);
    return this;
  }

  /** @param {import('joi').Schema} schema @param {'body'|'query'|'params'} property @returns {RouteReq}  */
  static validatorHandler(schema, property) {
    return (req, res, next) => {
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error));
      }
      next();
    }
  }
}

module.exports = Route;