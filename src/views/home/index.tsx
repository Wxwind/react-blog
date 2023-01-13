import React, { useState, useEffect, useRef } from "react";
import PostPreview from "./components/PostPreview";
import styles from "./styles.module.scss";
import img1 from "@/assets/images/mainbg-1.jpg";
import img2 from "@/assets/images/mainbg-2.jpg";

const Home = () => {
  return (
    <div>
      {/*Header*/}
      <div className={styles.header}>
        <h1 className={styles.title}>微夏丿风的成长之路</h1>
        <div className={styles.bgImage}></div>
      </div>
      {/*Content*/}
      <div className={styles.content}>
        {/*Posts Preview*/}
        <div className={styles.postsPreviw}>
          <PostPreview
            title={"123"}
            particleId={1}
            imageURL={img1}
            desc={"hello"}
            meta={{ publishTime: "2022-11-17" }}
          />
          <PostPreview
            title={"456"}
            particleId={2}
            imageURL={img2}
            desc={"hellodaswawfawgawfawgawesg"}
            meta={{ publishTime: "2022-11-17" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
