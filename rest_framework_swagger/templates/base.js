$(function () {
    window.swaggerUi = new SwaggerUi({
        url: '{{ swagger_settings.discovery_url }}',
        apiKey: '{{ swagger_settings.api_key }}',
        dom_id: 'swagger-ui-container',
        supportedSubmitMethods: {{ swagger_settings.enabled_methods }},
        onComplete: function (swaggerApi, swaggerUi){
            log('Loaded SwaggerUI')
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        },
        onFailure: function (data) {
            log('Unable to Load SwaggerUI');
        },
        docExpansion: '{{ swagger_settings.doc_expansion }}',
        csrfCookieName: {{ django_settings.CSRF_COOKIE_NAME }}
    });

    $('#input_apiKey').change(function () {
        var key = $('#input_apiKey')[0].value;
        log('key: ' + key);

        if (key && key.trim() != '') {
            console.log('added key ' + key);
            window.authorizations.add('key', new ApiKeyAuthorization('Authorization', '{{ swagger_settings.token_type }} ' + key, 'header'));
        }
    });

    {% if swagger_settings.api_key %}
        window.authorizations.add('key', new ApiKeyAuthorization('Authorization', '{{ swagger_settings.token_type }} ' + '{{ swagger_settings.api_key }}', 'header'));
    {% endif %}

    {# Add version to Accept header, if AcceptHeaderVersioning is used. #}
    {% if swagger_settings.api_version and rest_framework_settings.DEFAULT_VERSIONING_CLASS == 'rest_framework.versioning.AcceptHeaderVersioning' %}
        window.authorizations.add('version', {
            apply: function(obj, authorizations) {
                $.each(obj.headers, function(k, v) {
                    if (k.toLowerCase() === "accept") {
                        if (v.indexOf('; version=') === -1) {
                            obj.headers[k] += "; version={{ swagger_settings.api_version }}";
                        }
                        return false;  // break.
                    }
                });
                return true;
            }
        });
    {% endif %}

    window.swaggerUi.load();
});
