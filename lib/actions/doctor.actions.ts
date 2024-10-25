'use server';

import { ID, InputFile, Query } from 'node-appwrite';
import {
  BUCKET_ID,
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  storage,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import { CreateDoctorParams } from '@/@types';

export const createDoctor = async (doctor: CreateDoctorParams) => {
  try {
    const inputFile = InputFile.fromBlob(
      doctor.avatar?.get('blobFile') as Blob,
      doctor.avatar?.get('fileName') as string
    );

    const file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

    const newDoctor = await databases.createDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {
        name: doctor.name,
        avatar: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      }
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
