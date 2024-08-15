"use client";

import { FC } from "react";
import DbForm from "../components/DbForm";

const Home: FC = () => {
  const handleFormSubmit = async (tableName: string) => {
    console.log(tableName);
  }

  return (
    <main className="min-h-screen">
      <DbForm onSubmit={handleFormSubmit} />
    </main>
  );
};

export default Home;
