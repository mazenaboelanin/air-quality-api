import cron from 'node-cron';
import { checkAirQualityJob } from './check-air-quality.job';

const schedules = [
  {
    job: checkAirQualityJob,
    schedule: '*/15 * * * * *'
  }
];

export function runScheduler() {
  schedules.forEach(({ schedule: cronExpression, job }) => {
    cron.schedule(cronExpression, async () => {
      try {
        console.log('==== Cron job is running every minute!', new Date().toISOString());
        await job();
      } catch (error) {
        console.log('==== CRON error', error)
      } finally {
        console.log('==== ENDED Cron job!', new Date().toISOString());
      }
    });
  });
}
