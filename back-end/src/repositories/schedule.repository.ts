import { driver } from './connection-pools/neo4j.db';

// user가 생성한 앞으로의 일정 가져오기(get)
export async function getScheduleList(email: string) {
  const session = driver().session();
  let result;
  const dateList = [];

  try {
    result = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule) RETURN b`,
    );

    for (const rec of result.records) {
      dateList.push(rec._fields[0]);
    }
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();
  // console.log(result)
  return dateList;
}

// 일정 생성하기(post)
export async function createSchedule(
  email: string,
  id: string,
  start: string,
  end: string,
  title: string,
  allDay: boolean,
) {
  const session = driver().session();

  try {
    const create = await session.run(
      `CREATE (n:Schedule{title:"${title}", id:"${id}", start:"${start}", end:"${end}", allDay:"${allDay}"}) RETURN n`,
    );

    const make_rel = await session.run(
      `MATCH (a:User{email:"${email}"}), (b:Schedule{title:"${title}", id:"${id}", start:"${start}", end:"${end}", allDay:"${allDay}"}) CREATE (a)-[r:CREATE_IN]->(b) RETURN a, r, b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = {
    message: 'Create Schedule',
    email: `${email}`,
    start: `${start}`,
    end: `${end}`,
  };

  return result;
}

// 일정 수정하기(put)
export async function updateSchedule(
  email: string,
  id: string,
  title: string,
  start: string,
  end: string,
  allDay: boolean,
) {
  const session = driver().session();
  let update;
  try {
    update = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule) WHERE id(b) = ${id} SET b.title = "${title}", b.start = "${start}", b.end = "${end}", b.allDay = "${allDay}" RETURN b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();
  const result = {
    message: 'Update Schedule',
    date: update.records[0]._fields[0].properties,
  };
  return result;
}

// 일정 삭제하기(delete)
export async function deleteSchedule(email: string, id: string) {
  const session = driver().session();

  try {
    const del = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule) WHERE id(b) = ${id} DETACH DELETE b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = { message: 'Delete Schedule', user: `${email}` };
  return result;
}
