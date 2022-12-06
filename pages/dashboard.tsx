import React from "react";
import Layout from "../components/Layout";
import * as cookie from "cookies-next";
import { GetServerSideProps } from "next";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetSkeleton from "../components/TweetSkeleton";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function Dashboard(props: { bookmark: any }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
    router.reload();
  };

  return (
    <Layout>
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto grid place-items-center">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 text-center hover:text-slate-900">
              A Random Bookmark For You
            </h1>
            <Button fn={refreshData} />
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 mt-8">
            <TwitterTweetEmbed
              tweetId={props.bookmark.id}
              options={{ align: "center" }}
              placeholder={<TweetSkeleton />}
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = cookie.getCookie("oauth2_access_token", { req, res });

  const response = await fetch("http://localhost:3000/api/twitter/bookmarks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });

  const bookmarks = await response.json();

  const bookmark = bookmarks.data[Math.floor(Math.random() * bookmarks.data.length)];

  return {
    props: { bookmark },
  };
};
