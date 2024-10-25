'use server';

import { ID, Query } from 'node-appwrite';
import {
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  databases,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import { CreateDoctorParams } from '@/@types';

export const createDoctor = async (doctor: CreateDoctorParams) => {
  try {
    const newDoctor = await databases.createDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      ID.unique(),
      doctor
    );

    return parseStringify(newDoctor);
  } catch (error) {
    console.error(error);
  }
};

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
