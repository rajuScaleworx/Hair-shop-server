import * as express from 'express';
import CollectiontypeController from '../controller/collectionTypeController';
import bodyParser from 'body-parser';
import {authorized} from '../passport.mw';

const collectiontypeController= new CollectiontypeController()

export const collectiontyperoute= express.Router()
const jsonparser=bodyParser.json()
collectiontyperoute.post('/collectiontype',jsonparser,authorized,collectiontypeController.Addcollectiontype)
collectiontyperoute.delete('/collectiontype/:id',jsonparser,authorized,collectiontypeController.Removecollectiontype)
collectiontyperoute.get('/collectiontype',collectiontypeController.getCollectiontypewithproduct)
collectiontyperoute.post('/collection_update',jsonparser,authorized,collectiontypeController.updateCollection);
