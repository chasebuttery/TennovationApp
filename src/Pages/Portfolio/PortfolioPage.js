import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getActivitiesCreatedBy,
  getActivitiesJoinedBy,
} from "../../Backend/ActivitiesDB";
import ActivityCard from "../../Components/Activity/ActivityCard";
import "./PortfolioPage.scss";

export default function PortfolioPage() {
  const [activitiesCreated, setActivitiesCreated] = useState([]);
  const sport = "tennis";
  const userName = window.localStorage.getItem("userName") || "none";

  const [activitiesJoined, setActivitiesJoined] = useState([]);

  const [find, setFind] = useState("Created");

  useEffect(() => {
    async function getActivitiesCreated() {
      const list = await getActivitiesCreatedBy(userName);
      setActivitiesCreated(
        list.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getActivitiesCreated();
  }, []);

  useEffect(() => {
    async function getActivitiesJoined() {
      const list = await getActivitiesJoinedBy(userName);
      setActivitiesJoined(
        list.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getActivitiesJoined();
  }, []);

  return (
    <div className="PortfolioPage">
      <h1>Activity Portfolio</h1>
      <p>View your favorite activities and events. </p>
      <div className="FindSelect">
        <button
          className={find === "Created" ? "ActiveFind" : "Find"}
          onClick={(e) => {
            e.preventDefault();
            setFind("Created");
          }}
        >
          Created
        </button>

        <button
          className={find === "Joined" ? "ActiveFind" : "Find"}
          onClick={(e) => {
            e.preventDefault();
            setFind("Joined");
          }}
        >
          Joined
        </button>

        <button
          className={find === "Favorited" ? "ActiveFind" : "Find"}
          onClick={(e) => {
            e.preventDefault();
            setFind("Favorited");
          }}
        >
          Favorited
        </button>
      </div>

      <div className="Portfolio">
        <div className="PortfolioGrid">
          {activitiesCreated.map((activity) => (
            <div>
              <ActivityCard key={activity.id} activity={activity} />
            </div>
          ))}
        </div>
        {find === "Joined" && (
          <div className="PortfolioGrid">
            {activitiesJoined.map((activity) => (
              <div>
                <ActivityCard key={activity.id} activity={activity} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
