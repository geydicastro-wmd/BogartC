import { Breadcrumb } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

export default function Breadcrumbs() {
  const location = useLocation()

  const pathnames = location.pathname.split("/").filter((x) => x)

  return (
    <Breadcrumb className="d-flex justify-content-center text-center">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`
        const isLast = index === pathnames.length - 1

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {value}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to }}
            key={to}
          >
            {value}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}