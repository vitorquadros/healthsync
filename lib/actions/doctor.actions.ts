'use server';

import { Query } from 'node-appwrite';
import {
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  databases,
} from '../appwrite.config';
import { parseStringify } from '../utils';

export const getDoctorsList = async () => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    return parseStringify(doctors);
  } catch (error) {
    console.error(error);
  }
};
