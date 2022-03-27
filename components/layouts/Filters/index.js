import { useRouter } from "next/router";
import React, { Fragment } from "react";

const filterTypes = [
  {
    title: "Job Type",
    name: "jobtype",
    fields: [
      {
        value: "Pernament",
        label: "Pernament"
      },
      {
        value: "Temporary",
        label: "Temporary"
      },
      {
        value: "Intership",
        label: "Intership"
      }
    ]
  },
  {
    title: "Education",
    name: "education",
    fields: [
      {
        value: "Bachelors",
        label: "Bachelors"
      },
      {
        value: "Masters",
        label: "Masters"
      },
      {
        value: "Phd",
        label: "Phd"
      }
    ]
  },
  {
    title: "Experience",
    name: "experience",
    fields: [
      {
        value: "No experience",
        label: "No experience"
      },
      {
        value: "1 year",
        label: "1 year"
      },
      {
        value: "2 years",
        label: "2 years"
      },
      {
        value: "3 years above",
        label: "3 years+"
      }
    ]
  },
  {
    title: "Salary Range",
    name: "salary",
    fields: [
      {
        value: "1-50000",
        label: "$1 - $50,000"
      },
      {
        value: "50000-100000",
        label: "$50,000 - $100,000"
      },
      {
        value: "100000-200000",
        label: "$100,000 - $200,000"
      },
      {
        value: "300000-500000",
        label: "$300,000 - $500,000"
      },
      {
        value: "500000-1000000",
        label: "$500,000 - $1,000,000"
      },
    ]
  },
]

const Filters = () => {
  const router = useRouter();
  let queryParams;

  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search);
  }

  const handleClick = (checkbox) => {
    if (typeof window !== 'undefined') {
      const checkboxes = document.getElementsByName(checkbox.name);

      checkboxes.forEach(item => {
        if (item !== checkbox) item.checked = false;
      })
    }

    if (!checkbox.checked) {
      if (queryParams.has(checkbox.name)) {
        queryParams.delete(checkbox.name);
      }
    } else {
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value)
      } else {
        queryParams.append(checkbox.name, checkbox.value)
      }
    }

    router.replace({
      search: queryParams.toString()
    })
  }

  const checkHandler = (checkboxType, checkboxValue) => {
    if (typeof window !== 'undefined') {
      const value = queryParams.get(checkboxType);
      if (checkboxValue === value) return true;
      return false
    }
  }
  
  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      {filterTypes.map((type) => {
        return (
          <Fragment key={type.name}>
            <div className="filter-wrapper" >
              <h5 className="filter-heading mb-3">{type.title}</h5>
              {type.fields.map((field, i) => (
                <div className="form-check" key={`${type.name}-${i}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={type.name}
                    id={`${type.name}-${i}`}
                    value={field.value}
                    defaultChecked={checkHandler(type.name, field.value)}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <label className="form-check-label" htmlFor={`${type.name}-${i}`}>
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
            <hr />
          </Fragment>
        )
      })}
    </div>
  );
};

export default Filters;
