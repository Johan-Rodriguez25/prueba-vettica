from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import Log

import requests
import time
import os

API_URL = os.environ['API_URL']
BEARER_TOKEN = os.environ['BEARER_TOKEN']

def create_log(request, resource, response, start_time):
    log_instance = Log(
        resource=resource,
        payload=str(request.data),
        headers="\n".join([f"{key}: {value}" for key, value in request.headers.items()]),
        user_id=request.user.id,
        http_method=request.method,
        processing_time_ms=int((time.time() - start_time) * 1000),
        client_http_status=response.status_code,
        api_http_status=response.status_code,
        client_ip=request.META.get('REMOTE_ADDR')
    )
    log_instance.save()

class BaseCardAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    resource = ''

    def perform_request(self, card_number):
        start_time = time.time()

        response = requests.get(f'{API_URL}/{self.api_path}/{card_number}', headers={
            "Authorization": f"Bearer {BEARER_TOKEN}"
        })

        response_data = response.json()

        create_log(self.request, self.resource, response, start_time)

        return response, response_data

class ValidateCardAPIView(BaseCardAPIView):
    api_path = 'card/valid'
    resource = '/v1/api/validateCard'

    def post(self, request):
        card_number = request.data.get('card_number')
        response, response_data = self.perform_request(card_number)

        if response.status_code == 200:
            return Response({
                'card': response_data.get('card'),
                'isValid': response_data.get('isValid'),
                'status': response_data.get('status'),
                'statusCode': response_data.get('statusCode')
            }, status=status.HTTP_200_OK)
        elif response.status_code == 400:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_400_BAD_REQUEST)
        elif response.status_code == 500:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CardInfoAPIView(BaseCardAPIView):
    api_path = 'card/getInformation'
    resource = '/v1/api/cardInfo'

    def post(self, request):
        card_number = request.data.get('card_number')
        response, response_data = self.perform_request(card_number)

        if response.status_code == 200:
            return Response({
                'cardNumber': response_data.get('cardNumber'),
                'profileCode': response_data.get('profileCode'),
                'profile': response_data.get('profile'),
                'profile_es': response_data.get('profile_es'),
                'bankCode': response_data.get('bankCode'),
                'bankName': response_data.get('bankName'),
                'userName': response_data.get('userName'),
                'userLastName': response_data.get('userLastName')
            }, status=status.HTTP_200_OK)
        elif response.status_code == 400:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_400_BAD_REQUEST)
        elif response.status_code == 500:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CardBalanceAPIView(BaseCardAPIView):
    api_path = 'card/getBalance'
    resource = '/v1/api/cardBalance'

    def post(self, request):
        card_number = request.data.get('card_number')
        response, response_data = self.perform_request(card_number)

        if response.status_code == 200:
            return Response({
                'card': response_data.get('card'),
                'balance': response_data.get('balance'),
                'balanceDate': response_data.get('balanceDate'),
                'virtualBalance': response_data.get('virtualBalance'),
                'virtualBalanceDate': response_data.get('virtualBalanceDate')
            }, status=status.HTTP_200_OK)
        elif response.status_code == 400:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_400_BAD_REQUEST)
        elif response.status_code == 500:
            return Response({
                'errorCode': response_data.get('errorCode'),
                'errorMessage': response_data.get('errorMessage')
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
