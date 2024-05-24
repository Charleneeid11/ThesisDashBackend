import express, { Express, Request, Response, NextFunction } from "express";
import { ExpressRootError } from "./interfaces/Errors";
import connectDB from "./services/db";
import adminRouter from "./routes/admin"
import folderRouter from "./routes/folder"
import fileRouter from "./routes/file"
import multer from 'multer'
import dotenv from 'dotenv';
dotenv.config();

var createError = require('http-errors');
// var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app : Express = express();
const connection = connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
  }
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter)
app.use('/folder', folderRouter)
app.use('/file', fileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: ExpressRootError, req: Request, res: Response, next: NextFunction): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//this starts the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
