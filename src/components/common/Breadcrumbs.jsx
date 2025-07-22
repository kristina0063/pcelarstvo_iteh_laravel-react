import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  // Delovi putanje bez praznih segmenata
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="my-3">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        
      </Breadcrumb.Item>

      {pathnames.map((segment, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {decodeURIComponent(segment)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {decodeURIComponent(segment)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
