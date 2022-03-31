import React from 'react'
import Link from 'next/link';
import DataTable from 'react-data-table-component';

const JobsApplied = ({ jobs }) => {
  const columns = [
    {
      name: 'Job name',
      sortable: true,
      selector: (row) => row.title
    },
    {
      name: 'Salary',
      sortable: true,
      selector: (row) => row.salary
    },
    {
      name: 'Education',
      sortable: true,
      selector: (row) => row.education
    },
    {
      name: 'Experience',
      sortable: true,
      selector: (row) => row.experience
    },
    {
      name: 'Applied on',
      sortable: true,
      selector: (row) => row.applieOn
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => row.action
    }
  ];

  const data = [];

  jobs && jobs.forEach((item) => {
    const { title, salary, education, experience } = item.job;
    data.push({
      title,
      salary,
      education,
      experience,
      applieOn: item.appliedAt.substring(0, 10),
      action: (
        <Link href={`/job/${item.job.id}`}>
          <a className="btn btn-primary">
            <i aria-hidden className="fa fa-eye"></i>
          </a>
        </Link>
      )
    })
  })
  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">Job Applied</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
  )
}

export default JobsApplied;
