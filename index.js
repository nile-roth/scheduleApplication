//dependencies
const express = require('express');            //express.js for frontend framework
const sqlite3 = require('sqlite3').verbose();  //sqlite for local database
const bcrypt = require('bcryptjs');            //for password hashing 
const jwt = require('jsonwebtoken');           //for passing task data to/from server
const cors = require('cors');                  //allows frontend and backend to communicate on different ports
