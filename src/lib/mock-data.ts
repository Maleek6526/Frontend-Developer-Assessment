import { faker } from '@faker-js/faker';

export type ServiceProvider = {
  id: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  vendorType: 'Independent' | 'Company';
  serviceOffering: 'Housekeeping' | 'Window Cleaning' | 'Car Valet';
  signupDate: Date;
  status: 'Onboarded' | 'Rejected';
  notes?: string;
};

const createRandomProvider = (): ServiceProvider => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  postcode: faker.location.zipCode('GB'),
  vendorType: faker.helpers.arrayElement(['Independent', 'Company']),
  serviceOffering: faker.helpers.arrayElement(['Housekeeping', 'Window Cleaning', 'Car Valet']),
  signupDate: faker.date.past(),
  status: faker.helpers.arrayElement(['Onboarded', 'Rejected']),
  notes: '',
});

export const serviceProviders: ServiceProvider[] = Array.from({ length: 55 }, createRandomProvider);
