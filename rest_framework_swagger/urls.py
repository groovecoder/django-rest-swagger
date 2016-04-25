from django.conf.urls import url
from rest_framework_swagger.views import (SwaggerBaseJSView,
                                          SwaggerResourcesView, SwaggerApiView,
                                          SwaggerUIView)


urlpatterns = [
    url(r'^$', SwaggerUIView.as_view(), name="django.swagger.base.view"),
    url(r'^api-docs/$', SwaggerResourcesView.as_view(), name="django.swagger.resources.view"),
    url(r'^api-docs/(?P<path>.*)/?$', SwaggerApiView.as_view(), name='django.swagger.api.view'),
    url(r'^base.js$', SwaggerBaseJSView.as_view(), name='django.swagger.basejs.view')
]
