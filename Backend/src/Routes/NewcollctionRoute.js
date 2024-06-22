import NewCollections from "../Controllers/Newcollections.js";
import {popularInWomen} from "../Controllers/Newcollections.js";
import express  from 'express';

const NewcollectionRoute = express.Router();

NewcollectionRoute.get('/newcollection',NewCollections)
NewcollectionRoute.get('/popular-in-women',popularInWomen)

export default NewcollectionRoute
