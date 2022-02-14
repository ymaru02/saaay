import { driver } from './connection-pools/neo4j.db';

// user가 생성한 앞으로의 일정 가져오기(get)
export async function getScheduleList(userId: string) {
  const session = driver().session();
  let result;
  const dateList = [];

  try {
    result = await session.run(
      `MATCH (a:User)-[r:CREATE_IN]->(b:Schedule) WHERE id(a) = ${userId} RETURN b`,
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
  userId: string,
  start: string,
  end: string,
  title: string,
  allDay: boolean,
) {
  const session = driver().session();

  try {
    const create = await session.run(
      `CREATE (n:Schedule{title:"${title}", start:"${start}", end:"${end}", allDay:"${allDay}"}) RETURN n`,
    );

    const make_rel = await session.run(
      `MATCH (a:User), (b:Schedule{title:"${title}", start:"${start}", end:"${end}", allDay:"${allDay}"}) WHERE id(a) = ${userId} CREATE (a)-[r:CREATE_IN]->(b) RETURN a, r, b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = {
    message: 'Create Schedule',
    userId: `${userId}`,
    start: `${start}`,
    end: `${end}`,
  };

  return result;
}

// 일정 수정하기(put)
export async function updateSchedule(
  userId: string,
  id: string,
  start: string,
  end: string,
  allDay: boolean,
) {
  const session = driver().session();
  let update;
  try {
    update = await session.run(
      `MATCH (a:User)-[r:CREATE_IN]->(b:Schedule) WHERE id(a) = ${userId} AND id(b) = ${id} SET b.start = "${start}", b.end = "${end}", b.allDay = "${allDay}" RETURN b`,
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
export async function deleteSchedule(userId: string, date: string) {
  const session = driver().session();

  try {
    const del = await session.run(
      `MATCH (a:User)-[r:CREATE_IN]->(b:Schedule{date:"${date}"}) WHERE id(a) = ${userId} DETACH DELETE b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = { message: 'Delete Schedule', user: `${userId}` };
  return result;
}
