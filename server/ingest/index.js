import { Inngest } from "inngest";
import { User } from "../models/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "movie-ticket-booking",
  signingKey: process.env.INGEST_SIGNING_KEY
});

//ingest function to save user data to a database
const syncUserCreation = inngest.createFunction(
  {id:'sync-user-from-clerk'},
  {event:'clerk/user.created'},
  async({event})=>{
    const {id,image_url,first_name,last_name,email_addresses} = event.data
    const userData ={
      _id:id,
      email:email_addresses[0],
      name:first_name+' ' + last_name,
      image:image_url
    }
    await User.create(userData)
  }
)

//ingest funciton to delete user from database
const syncUserDeletion = inngest.createFunction(
  {id:'delete-user-with-clerk'},
  {event:'clerk/user.deleted'},
  async({event})=>{
    const {id} = event.data
    const user = await User.findByIdAndDelete({_id:id})
  }
)

//ingest function to update the user details
const suncUserUpdation = inngest.createFunction(
  {id:'update-user-from-clerk'},
  {event:'clerk/user.updated'},
  async({event})=>{
    const {id,image_url,first_name,last_name,email_addresses} = event.data
    const userData ={
      _id:id,
      email:email_addresses[0],
      name:first_name+' ' + last_name,
      image:image_url
    }
    await User.findByIdAndUpdate(id,userData)
  }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,suncUserUpdation];