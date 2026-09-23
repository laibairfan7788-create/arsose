import crypto from 'node:crypto';
import { Enquiry } from './models/Enquiry.js';
const memory=[];
let persistent=false;
export function setPersistence(value){persistent=value}
export function persistenceMode(){return persistent?'mongodb':'memory'}
export async function createEnquiry(input){if(persistent){const doc=await Enquiry.create(input);return normalize(doc)}const item={...input,id:crypto.randomUUID(),status:'new',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};memory.unshift(item);return item}
export async function listEnquiries(status='all'){if(persistent){const query=status==='all'?{}:{status};const docs=await Enquiry.find(query).sort({createdAt:-1}).lean();return docs.map(normalize)}return memory.filter(x=>status==='all'||x.status===status)}
export async function updateEnquiry(id,status){if(persistent){if(!Enquiry.db.base.isValidObjectId(id))return null;const doc=await Enquiry.findByIdAndUpdate(id,{status},{new:true});return doc?normalize(doc):null}const item=memory.find(x=>x.id===id);if(!item)return null;item.status=status;item.updatedAt=new Date().toISOString();return item}
function normalize(doc){const x=doc.toObject?doc.toObject():doc;return {...x,id:String(x._id),_id:undefined,__v:undefined}}
export function resetMemory(){memory.splice(0)}
