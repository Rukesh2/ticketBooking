import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// inngest function to create a user in database
const syncUserCreation = inngest.createFunction(
  {id:'sync-user-from-clerk'},
  {event:'clerk/user.created'},
  async({event})=>{
    const {id,image_url,email_addresses,first_name,last_name} = event.data
    const userData = {
      _id:id,
      name:first_name+' '+last_name,
      email:email_addresses[0].email_address,
      image:image_url
    } 
    await User.create(userData)
  }
)

//inngest funciton to delete the user from database
  const syncUserDeletion = inngest.createFunction(
    {id:'delete-user-with-clerk'},
    {event:'clerk/user.deleted'},
    async({event})=>{
      const {id} = event.data
      await User.findByIdAndDelete(id)
    }
)

// inngest funciton to update userdetails
const syncUserUpdation = inngest.createFunction(
  {id:'update-user-from-clerk'},
  {event:'clerk/user.updated'},
  async({event})=>{
    const {id,image_url,email_addresses,first_name,last_name} = event.data
    const userData = {
      _id:id,
      name:first_name+' '+last_name,
      email:email_addresses[0].email_address,
      image:image_url
    }
    await User.findByIdAndUpdate(id,userData) 
  }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];