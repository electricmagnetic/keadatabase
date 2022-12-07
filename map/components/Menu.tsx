import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const logo =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2Zzg3MyIKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iOTAiCiAgIGhlaWdodD0iOTAiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTg3OSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczg3NyIgLz48ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMjAwNzM0OTgsMTIuNjczMDA4KSIKICAgICBpZD0iZzg2MyIKICAgICBzdHlsZT0iZmlsbDojODA3ZTc3O2ZpbGwtb3BhY2l0eToxIj48cGF0aAogICAgICAgaWQ9InBhdGg4NjEiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkuMiwtMzEuNjczKSIKICAgICAgIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiM4MDdlNzc7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQiCiAgICAgICBkPSJtIDc3LjM4LDkyLjAyNiAyNy4xMTksLTI3LjExNyBhIDIuNTM2LDIuNTM2IDAgMCAxIDMuNTcsLTAuMDA0IDIuNTQ1LDIuNTQ1IDAgMCAxIC0wLjAwNSwzLjU3MyBMIDgwLjk0OSw5NS41OTQgQSAyLjUzMiwyLjUzMiAwIDAgMSA3Ny4zODEsOTUuNTkxIDIuNTM5LDIuNTM5IDAgMCAxIDc3LjM4LDkyLjAyNiBtIC03LjEzNCwtNy4xMzMgMzQuMDE1LC0zNC4wMTQgYSAyLjUzLDIuNTMgMCAwIDEgMy41NjgsMCAyLjUzNywyLjUzNyAwIDAgMSAtMC4wMDMsMy41NjggbCAtMzQuMDEzLDM0LjAxIGEgMi41MywyLjUzIDAgMCAxIC0zLjU2NCwwLjAwNCAyLjUzNiwyLjUzNiAwIDAgMSAtMC4wMDQsLTMuNTY4IG0gLTcuMTM0LC03LjEzOCA0MC4yMTYsLTQwLjIxNyBhIDIuNTM5LDIuNTM5IDAgMCAxIDMuNTc4LDAuMDAzIGMgMC45NywwLjk3MiAwLjk3MywyLjU4NyAtMC4wMDMsMy41NjYgTCA2Ni42OCw4MS4zMjMgYSAyLjUyNiwyLjUyNiAwIDAgMSAtMy41NiwwLjAwNSAyLjU0MiwyLjU0MiAwIDAgMSAtMC4wMDksLTMuNTczIE0gNzAuNTk5LDU5LjI2NCA0Ny4zMDcsMzUuOTcyIGEgMi41MjcsMi41MjcgMCAwIDEgLTAuMDA0LC0zLjU2OCAyLjU0MywyLjU0MyAwIDAgMSAzLjU3LDAgbCAyMy4yOTMsMjMuMjkyIGMgMC45NzgsMC45OCAwLjk3OCwyLjU5IC0wLjAwMiwzLjU3IEEgMi41MzUsMi41MzUgMCAwIDEgNzAuNTk5LDU5LjI2NCBNIDYzLjI4LDY2LjIxNSAzMy4yNzcsMzYuMjEyIGEgMi41MywyLjUzIDAgMCAxIDAsLTMuNTY4IDIuNTM2LDIuNTM2IDAgMCAxIDMuNTY2LDAgTCA2Ni44NDYsNjIuNjUgYSAyLjUzMiwyLjUzMiAwIDAgMSAwLDMuNTY2IDIuNTM1LDIuNTM1IDAgMCAxIC0zLjU2NiwwIE0gNTYuMDM5LDczLjI0NCAxOS45MzYsMzcuMTQgYSAyLjUzNCwyLjUzNCAwIDAgMSAwLjAwMywtMy41NzUgYyAwLjk3MSwtMC45NyAyLjU4OCwtMC45NzMgMy41NjUsMC4wMDQgbCAzNi4xMDMsMzYuMTA0IGEgMi41MywyLjUzIDAgMCAxIDAuMDAyLDMuNTYzIDIuNTM2LDIuNTM2IDAgMCAxIC0zLjU3LDAuMDA3IG0gLTkuOTcyLDEuMjE5IHYgLTAuMDA3IGMgMCwwIC0wLjQ2NCwwLjQ5NCAtMS4wODgsMS4zMjUgLTAuMDIxLDAuMDMzIC0wLjA0OSwwLjA2MiAtMC4wNywwLjA5NSAtMS4zNDEsMS44MTIgLTMuNDIsNS4yNTcgLTMuODUzLDkuNzc1IC0wLjY0NCw2Ljc0NiAyLjE4MywxMC42NzcgMi4xODMsMTAuNjc3IDAsMCAtMC4zNjIsLTMuOTg4IDEuNjMyLC02LjM5NSBhIDkuODM4LDkuODM4IDAgMCAxIDEuNDU4LC0xLjQ0MiBjIDEuNzY2LDEuNjcgNC4xMzQsMi43MTMgNi43NTgsMi43MTMgYSA5LjgzLDkuODMgMCAwIDAgNy41NDUsLTMuNTE2IEMgNjIuMDcsODUuOTc3IDQ3Ljg1Myw3Mi42NDIgNDYuMDY3LDc0LjQ2MiIgLz48L2c+PC9zdmc+Cg==";

const Menu: FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <nav className="navbar bg-light fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img
            alt="Kea Database"
            height="25"
            className="d-inline-block me-1"
            src={logo}
          />
        </Link>
        {title && (
          <div className="d-flex">
            <span className="navbar-text">{title}</span>
          </div>
        )}
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          {children && <div>{children}</div>}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="typeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                By Type
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="typeDropdown"
              >
                <li>
                  <Link className="dropdown-item" href="/fwf">
                    FWF Observations
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/kct">
                    KCT Observations
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/track">
                By Bird
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/zones">
                By Zone
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
