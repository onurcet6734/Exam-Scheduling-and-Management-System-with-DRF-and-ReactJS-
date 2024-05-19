from rest_framework.response import Response
from rest_framework import status
from schedulings.models import Scheduling


class CheckCourseOverlappingService:
    def check_schedules(self, serializer):
        new_scheduling_start = serializer.validated_data['exam_start_date']
        new_scheduling_finish = serializer.validated_data['exam_finish_date']
        existing_schedules = Scheduling.objects.filter(user=serializer.validated_data.get('user', None))
        for existing_schedule in existing_schedules:
            if (new_scheduling_start < existing_schedule.exam_finish_date and
                    new_scheduling_finish > existing_schedule.exam_start_date):
                return False
        return True