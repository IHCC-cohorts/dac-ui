import React from "react";
import { css } from "emotion";

import chevron from "./assets/chevron-right.svg";
import websiteIcon from "./assets/website.svg";
import arrow from "./assets/arrow-right@2x.png";
import checkmark from "./assets/check.svg";
import Xmark from "./assets/X.svg";

import Charts from "./charts";
import {
  Arranger,
  Aggregations,
  CurrentSQON,
  Table,
  // @ts-ignore
} from "@arranger/components/dist/Arranger";
import "@arranger/components/public/themeStyles/beagle/beagle.css";
import createArrangerFetcher from "./arrangerFetcher/createArrangerFetcher";
import Footer from "../../components/Footer";
import plusSign from "./assets/icon-plus.svg";
import minusSign from "./assets/icon-minus.svg";

const pageContainer = css`
  display: flex;
  flex-direction: row;
  max-height: 100%;
  height: 100%;
`;
const facetPanelContainer = (collapsed: boolean) => css`
  width: ${collapsed ? `50px` : `250px`};
  transition: all 0.25s;
  max-height: calc(100vh - 64px);
  border-right: solid 1px #dcdde1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;
const body = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;
const bodyContent = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px;
  padding-bottom: 0px;
  & .sqon-view {
    background-color: #eef5ff;
    border: none;
    & .sqon-more {
      line-height: 9px;
    }
    & .sqon-bubble.sqon-value {
      background-color: #011028;
    }
    & .sqon-value-group {
      color: #0056b9;
    }
    & .sqon-bubble.sqon-clear {
      border-color: #0056b9;
      color: #0056b9;
    }
  }
`;
const tableContainer = css`
  & .tableToolbar {
    padding: 8px 0px;
    font-size: 12px;
    height: 32px;
    & .group {
      height: 32px;
      display: none;
      & .dropDownHeader {
        display: none;
      }
      & .buttonWrapper {
        /* the Export TSV button */
        border-radius: 10px;
        border: solid 1px #b2b7c1;
        height: 27px;
      }
    }
    & .inputWrapper {
      display: none !important;
      border-color: #b6d1f7;
    }
  }
  & .ReactTable {
    border: none;
    max-height: calc(100vh - 430px);
    & .rt-table {
      border: solid 1px #b9b5c6;
      & .rt-td:first-child,
      & .rt-th:first-child {
        /* hides the select checkboxes */
        display: none;
      }
      & .rt-thead {
        background: white;
        & .rt-tr .rt-th {
          padding-top: 4px;
          padding-bottom: 4px;
          vertical-align: middle;

          font-size: 11px;
          color: #202020;
          text-align: left;
          & .rt-resizable-header-content {
            color: #202020;
          }
          &.-sort-asc {
            box-shadow: inset 0 3px 0 0 #0056b9;
          }
          &.-sort-desc {
            box-shadow: inset 0 -3px 0 0 #0056b9;
          }
          &:focus {
            outline: none;
          }
        }
      }
    }
    & .-pageJump {
      border-color: #b9b5c6;
      & .-pagination_button {
        font-size: 12px;
        border-color: #b9b5c6;
        &.-current {
          color: #202020;
          background-color: #eef5ff;
        }
      }
    }
    & .pagination-bottom {
      & .-pagination {
        select {
          border-radius: 4px;
          border: solid 1px #babcc2;
        }
        padding: 0px;
        height: 45px;
        box-shadow: none;
        border: none;
      }
    }
  }
`;
const facetScroller = (collapsed: boolean) => css`
  overflow: scroll;
  display: flex;
  ${
    collapsed
      ? css`
          & > * {
            display: none;
          }
        `
      : ""
  }
  .aggregation-card {
    border-top: none;
    border-left: none;
    padding: 0px;
    margin: 0px;
    & .input-range__track.input-range__track--active {
      background-color: #6da3f0;
    }
      word-break: break-word;
    }
    .toggle-button-option {
      border-color: #b5b5b5;
      &.active {
        background: #eef5ff;
      }
      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-right: none;
      }
      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-left: none;
      }
    }
    & .header {
      & .title-control {
        align-items: center;
        & .arrow {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          ::after {
            font-size: 18px;
            line-height: 100%;
          }
        }
      }
    }
    & .header .filter .inputWrapper {
      justify-content: unset !important;
      border-color: #b6d1f7;
      & input {
        max-width: 100%;
      }
      .inputIcon {
        display: none;
      }
    }
    &:last-child {
      border-bottom: none;
    }
    .header {
      margin: 0px;
      .title-wrapper {
        padding: 7px;
        background-color: white;
        color: #202020;
        border-bottom: none;
        & .title {
          margin-right: 10px;
          font-size: 12px;
          font-weight: bold;
          color: #011028;
        }
        &.collapsed {
          & > .arrow {
            padding: 0px;
          }
        }
      }
    }
    .filter {
      padding-left: 5px;
      padding-right: 5px;
    }
    .bucket {
      padding: 3px 5px 5px 5px;
    }
    .showMore-wrapper {
      color: #0056b9;
      margin-top: 0px;
      padding-left: 8px;
      justify-content: flex-end;
      white-space: nowrap;
      ::before {
        transform: scale(0.5);
        margin-right: 0px;
      }
      &.more {
        ::before {
          content: url(${plusSign});
        }
      }
      &.less {
        ::before {
          content: url(${minusSign});
        }
      }
    }
  }
`;
const footerStyle = css`
  height: 56px;
  min-height: 56px;
  max-height: 56px;
  background: white;
  border-top: solid 1px #dcdde1;
  font-size: 12px;
  padding: 0px 10px;
`;
const facetPanelFooter = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const chevronLeft = css`
  width: 10px;
  margin-left: -5px;
`;

const emptySqonContainer = css`
  padding: 0px;
  height: 52px;
  font-size: 14px;
  padding-left: 19px;
  display: flex;
  align-items: center;
`;

const emptySqonArrowStyle = css`
  width: 12px;
  transform: rotate(180deg);
  margin-right: 5px;
`;

const collapseButtonStyle = (collapsed: boolean) => css`
  border: none;
  cursor: pointer;
  transform: rotate(${collapsed ? "0deg" : "180deg"});
  transition: all 0.5s;
`;

const TableWebsiteCell = ({ original }: { original: { website: string } }) => {
  const icon = css`
    width: 15px;
  `;
  const link = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `;
  return (
    <a
      className={link}
      href={original.website}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img alt="website_icon" className={icon} src={websiteIcon}></img>
    </a>
  );
};

type SQON = {};

type CohortDocument = {
  cohort_name: string;
  countries: string[];
  current_enrollment: number;
  available_data_types: {
    biospecimens: boolean;
    environmental_data: boolean;
    genomic_data: boolean;
    phenotypic_clinical_data: boolean;
    ehr_data: boolean;
    longitudinal_data: boolean;
  };
  pi_lead: string;
};

const BooleanCell = ({ isTrue }: { isTrue: boolean }) => {
  const containerStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const iconStyle = css`
    height: 11px;
  `;
  return (
    <div className={`${containerStyle}`}>
      {isTrue ? (
        <img alt="check_mark" className={`${iconStyle}`} src={checkmark}></img>
      ) : (
        <img alt="x_mark" className={`${iconStyle}`} src={Xmark}></img>
      )}
    </div>
  );
};

const customTableColumns = [
  {
    index: 1,
    content: {
      accessor: "cohort_name",
      Header: "Cohort Name",
      Cell: ({ original }: { original: CohortDocument }) => (
        <>{original.cohort_name}</>
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "countries",
      style: { whiteSpace: "unset" },
      Header: "Countries",
      Cell: ({ original }: { original: CohortDocument }) => (
        <>{original.countries.join(", ")}</>
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "current_enrollment",
      Header: "Current Enrollment",
      maxWidth: 200,
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.genomic_data",
      resizable: false,
      width: 70,
      Header: (
        <>
          Genomic <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell isTrue={original.available_data_types.genomic_data} />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.environmental_data",
      resizable: false,
      width: 100,
      Header: (
        <>
          Environmental <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell
          isTrue={original.available_data_types.environmental_data}
        />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.biospecimens",
      resizable: false,
      width: 90,
      Header: (
        <>
          Biospecimen <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell isTrue={original.available_data_types.biospecimens} />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.phenotypic_clinical_data",
      resizable: false,
      width: 60,
      Header: (
        <>
          Clinical <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell
          isTrue={original.available_data_types.phenotypic_clinical_data}
        />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.longitudinal_data",
      resizable: false,
      width: 90,
      Header: (
        <>
          Longitudinal <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell isTrue={original.available_data_types.longitudinal_data} />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "available_data_types.ehr_data",
      resizable: false,
      width: 48,
      Header: (
        <>
          EHR <br /> Data
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell isTrue={original.available_data_types.ehr_data} />
      ),
    },
  },
  {
    index: 3,
    content: {
      width: 90,
      resizable: false,
      sortable: false,
      Header: (
        <>
          Data Sharing <br />
          Potential
        </>
      ),
      Cell: ({ original }: { original: CohortDocument }) => (
        <BooleanCell isTrue />
      ),
    },
  },
  {
    index: 3,
    content: {
      accessor: "pi_lead",
      Header: "PI Lead",
      style: { whiteSpace: "unset" },
      Cell: ({ original }: { original: CohortDocument }) => (
        <>{original.pi_lead}</>
      ),
    },
  },
  {
    index: 9999,
    content: {
      resizable: false,
      accessor: "website",
      Header: "Website",
      Cell: TableWebsiteCell,
      width: 70,
    },
  },
];

const PageContent = (props: { sqon: SQON | null }) => {
  const [facetPanelCollapsed, setFacetPanelCollapsed] = React.useState(false);
  const onFacetCollapserClick = () => {
    setFacetPanelCollapsed(!facetPanelCollapsed);
  };
  return (
    <div className={pageContainer}>
      <div className={facetPanelContainer(facetPanelCollapsed)}>
        <div className={facetScroller(facetPanelCollapsed)}>
          <Aggregations
            style={{
              width: "100%",
            }}
            componentProps={{
              getTermAggProps: () => ({
                maxTerms: 3,
              }),
            }}
            {...props}
          />
        </div>
        <div className={`${footerStyle} ${facetPanelFooter}`}>
          <div
            className={collapseButtonStyle(facetPanelCollapsed)}
            onClick={onFacetCollapserClick}
          >
            <img alt="chevron_left" src={chevron} className={chevronLeft}></img>
            <img alt="chevron_left" src={chevron} className={chevronLeft}></img>
          </div>
        </div>
      </div>
      <div className={body}>
        <div className={bodyContent}>
          {!props.sqon ? (
            <div className={`sqon-view ${emptySqonContainer}`}>
              <img
                alt="arrow_icon"
                src={arrow}
                className={emptySqonArrowStyle}
              ></img>
              Use the filter panel on the left to customize your cohort search.
            </div>
          ) : (
            <CurrentSQON {...props} />
          )}
          <Charts sqon={props.sqon}></Charts>
          <div className={tableContainer}>
            <Table {...props} customColumns={customTableColumns} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const CohortRepo = ({
  index,
  graphqlField,
  projectId,
  arrangerFetcher,
}: {
  index: string;
  graphqlField: string;
  projectId: string;
  arrangerFetcher: ReturnType<typeof createArrangerFetcher>;
}) => {
  return (
    <Arranger
      disableSocket
      api={arrangerFetcher}
      index={index}
      graphqlField={graphqlField}
      projectId={projectId}
      render={(props: any) => <PageContent {...props} />}
    />
  );
};

export default CohortRepo;
