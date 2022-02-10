import { driver } from './connection-pools/neo4j.db';

// user가 생성한 앞으로의 일정 가져오기(get)
export async function getScheduleList(email: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (a:User)-[rel:CREATE_IN]->(b:Schedule) WHERE a.email = ${email} RETURN b`,
    );
    const shceduleList = [];

    for (const record of result.records) {
      shceduleList.push(record._fields[0]);
      console.log(record)
    }
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  return result.records;
}

// 일정 생성하기(post)
export async function createSchedule(email: string, date: string) {
  const session = driver().session()
  let make_rel;
  try {
    const create = await session.run(
      `CREATE (n:Schedule{date:${date}}) RETURN n`,
    )

    make_rel = await session.run(
      `MATCH (a:User), (b:Schedule) WHERE a.email = ${email}  AND b.date = ${date} CREATE (a)-[r:CREATE_IN]->(b) RETURN a, r, b`,
    )
  
  } finally {
    await session.close()
  }
  
  // on application exit:
  await driver().close()

  return make_rel.records
}

// 일정 수정하기(patch)
export async function updateSchedule(email: string, date: string, update_date: string) {
  const session = driver().session()
  let update;
  try {
    update = await session.run(
      `MATCH (a:User{email:${email}})-[r:CREATE_IN]->(b:Schedule{date:${date}}) SET b.date = ${update_date} RETURN b`
    )
  
  } finally {
    await session.close()
  }
  
  // on application exit:
  await driver().close()

  return update.records[0].get[0]
}

// 일정 삭제하기(delete)
export async function deleteSchedule(email: string, date: string) {
  const session = driver().session();
  let result;

  try {
    result = await session.run(
      `MATCH (a:User{email:${email}})-[r:CREATE_IN]->(b:Schedule{date:${date}}) DETACH DELETE b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  return result.records[0].get[0];
}
