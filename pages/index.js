import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image:
//       "https://media.istockphoto.com/photos/mt-fuji-and-tokyo-skyline-picture-id904453184?b=1&k=20&m=904453184&s=170667a&w=0&h=rwzxuUV5F3Sr8qm9eqE09ZrknCIGe2ZgKmyxo2fIDgo=",
//     address: "some Address, 1234 ",
//     description: "This is a first Meetup",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image:
//       "https://media.istockphoto.com/photos/mt-fuji-and-tokyo-skyline-picture-id904453184?b=1&k=20&m=904453184&s=170667a&w=0&h=rwzxuUV5F3Sr8qm9eqE09ZrknCIGe2ZgKmyxo2fIDgo=",
//     address: "some Address, 1234 ",
//     description: "This is a Second Meetup",
//   },
//   {
//     id: "m3",
//     title: "Third Meetup",
//     image:
//       "https://media.istockphoto.com/photos/mt-fuji-and-tokyo-skyline-picture-id904453184?b=1&k=20&m=904453184&s=170667a&w=0&h=rwzxuUV5F3Sr8qm9eqE09ZrknCIGe2ZgKmyxo2fIDgo=",
//     address: "some Address, 1234 ",
//     description: "This is a Third Meetup",
//   },
//   {
//     id: "m4",
//     title: "Fourth Meetup",
//     image:
//       "https://media.istockphoto.com/photos/mt-fuji-and-tokyo-skyline-picture-id904453184?b=1&k=20&m=904453184&s=170667a&w=0&h=rwzxuUV5F3Sr8qm9eqE09ZrknCIGe2ZgKmyxo2fIDgo=",
//     address: "some Address, 1234 ",
//     description: "This is a Fourth Meetup",
//   },
// ];

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active Meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps(params) {
  const client = await MongoClient.connect(
    "mongodb+srv://Meetup-Website:meetupwebsite@cluster0.oqnin.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollectins = db.collection("meetups");

  const meetups = await meetupsCollectins.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
