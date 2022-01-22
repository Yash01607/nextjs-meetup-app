import React from "react";
import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetUphandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.push("/");
  };

  return <NewMeetUpForm onAddMeetup={addMeetUphandler}></NewMeetUpForm>;
};

export default NewMeetupPage;
