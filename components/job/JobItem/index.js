import React from "react";
import Link from "next/link";
import moment from "moment";

const JobItem = ({ data }) => {
  const getTimeToNow = () => moment.utc(data.createdAt).local().startOf('seconds').fromNow();

  return (
    <Link href={`job/${data.id}`} passHref>
      <div className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">{data.company}</h4>
            <h3 className="job-listing-title">{data.title}</h3>
            <p className="job-listing-text">{data.description.substring(0, 200)}...</p>
          </div>

          <span className="bookmark-icon"></span>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>
              <i aria-hidden className="fas fa-industry"></i> {data.industry}
            </li>

            <li>
              <i aria-hidden className="fas fa-briefcase"></i> {data.jobType}
            </li>
            <li>
              <i aria-hidden className="fas fa-money-check-alt"></i>${data.salary}
            </li>
            <li>
              <i aria-hidden className="far fa-clock"></i>{getTimeToNow()}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
