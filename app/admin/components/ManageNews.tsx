"use client";

import React from "react";
import AddNewsForm from "./AddNewsForm";
import AdminNewsList from "./AdminNewsList";

const ManageNews = () => {
  return (
    <div>
      {/* Add News Form */}
      <AddNewsForm />

      {/* Recent News List */}
      <AdminNewsList />
    </div>
  );
};

export default ManageNews;
