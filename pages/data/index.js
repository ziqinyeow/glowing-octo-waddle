import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { parse } from "papaparse";

export default function Data() {
  const [highlighted, setHighlighted] = useState(false);
  const [datas, setData] = useState([]);
  const [newDataset, setNewDataset] = useState([]);
  const oldDataset = [
    "July 2019",
    "Aug 2019",
    "Sep 2019",
    "Oct 2019",
    "Nov 2019",
    "Dec 2019",
    "Jan 2020",
    "Feb 2020",
    "Mar 2020",
    "Apr 2020",
    "May 2020",
    "Jun 2020",
    "July 2020",
    "Aug 2020",
    "Sep 2020",
    "Oct 2020",
  ];

  return (
    <Container>
      <Head>
        <title>Data</title>
        <meta name="description" content="Finance Model" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InnerContainer>
        <Main>
          <Header>
            <span>All Data</span>
          </Header>
          <Upload>
            <Drag
              onDragEnter={() => {
                setHighlighted(true);
              }}
              onDragLeave={() => {
                setHighlighted(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={async (e) => {
                e.preventDefault();
                if (
                  e.dataTransfer.files[0].type === "application/vnd.ms-excel" ||
                  e.dataTransfer.files[0].type === "text/csv"
                ) {
                  const file = await e.dataTransfer.files[0];
                  const text = await e.dataTransfer.files[0].text();
                  const result = parse(text, { header: true });
                  setData(result.data);
                  setNewDataset((prev) => [...prev, file.name]);
                }
              }}
              highlight={highlighted}
            >
              Drop csv file here
            </Drag>
            <Button>
              <input
                type="file"
                accept="application/vnd.ms-excel,.csv"
                id="file"
                onChange={async (e) => {
                  const file = await e.target.files[0];
                  const text = await e.target.files[0].text();
                  const result = parse(text, { header: true });
                  setData(result.data);
                  setNewDataset((prev) => [...prev, file.name]);
                }}
                hidden
              />
              <label htmlFor="file">
                <i className="ri-file-upload-line"></i> Upload
              </label>
            </Button>
          </Upload>
          <NewSection>
            <Header>
              <h2>New</h2>
            </Header>
            <DatasetContainer>
              {newDataset.map((newData, i) => (
                <Dataset key={i}>
                  <i className="ri-file-excel-2-line"></i>
                  {newData}
                </Dataset>
              ))}
            </DatasetContainer>
          </NewSection>
          <OldSection>
            <Header>
              <h2>Old</h2>
              <div>Model-trained dataset</div>
            </Header>
            <DatasetContainer>
              {oldDataset.map((old, i) => (
                <Dataset key={i}>
                  <i className="ri-folder-3-fill"></i>
                  {old}
                </Dataset>
              ))}
            </DatasetContainer>
          </OldSection>
        </Main>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 30px 0;
  background-color: ${(props) => props.theme.bg};

  * {
    color: ${(props) => props.theme.clr4};
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  width: 95%;
`;

const Header = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: ${(props) => props.theme.clr4};

  h2 {
    margin-bottom: 10px;
  }
`;

const Upload = styled.div`
  user-select: none;
  height: 150px;
  margin: 30px 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 50px;
`;

const Drag = styled.div`
  border: 5px solid;
  border-color: ${(props) =>
    props.highlight ? props.theme.clr5 : props.theme.clr6};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.clr4};
  font-weight: 400;
  border-radius: 16px;
`;

const Button = styled.div`
  height: 100%;
  label {
    height: 100%;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.clr5};
    color: ${(props) => props.theme.bg};
    font-weight: 400;
  }
  i {
    margin-right: 10px;
    color: ${(props) => props.theme.bg};
  }
`;

const NewSection = styled.div``;

const OldSection = styled.div``;

const DatasetContainer = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 20px;
`;

const Dataset = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  i {
    margin-right: 10px;
  }
`;
