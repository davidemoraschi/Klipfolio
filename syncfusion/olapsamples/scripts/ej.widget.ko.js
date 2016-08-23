(function ($, ej, wd, ko, undefined) {
    'use strict';

    var bindKoHandler = function (name, proto) {
        proto["ob.ignore"] = [];
        [].push.apply(proto["ob.ignore"], proto.observables || []);

        ko.bindingHandlers[name] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = koUnwrap(valueAccessor, proto["ob.ignore"]);
                $(element)[name](value);
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = koUnwrap(valueAccessor, proto["ob.ignore"]);
                $(element)[name]("option", value);
            }
        };
    };

    var koUnwrap = function (valueAccessor, ignoreProps) {
        var val = ko.utils.unwrapObservable(valueAccessor);
        if (typeof val === "function")
            val = val();
        if (ej.isPlainObject(val)) {
            for (var prop in val) {
                if (ignoreProps.indexOf(prop) === -1)
                    val[prop] = ko.utils.unwrapObservable(val[prop]);
            }
        }
        return val;
    }

    var widgets = wd.registeredWidgets;
    for (var name in widgets) {
        bindKoHandler(widgets[name].name, widgets[name].proto);
    }

    ej.extensions.ko = {
        subscriptions: {},
        register: function (value, field, instance) {
            if (!window.ko || !ko.isObservable(value))
                return value;

            ej.widget.observables.subscriptions[field] = value.subscribe(ej.proxy(ej.widget.observables.raise, { instance: instance, field: field }));
            return value;
        },
        raise: function (value) {
            this.instance.option(this.field, ej.extensions.modelGUID, true);
        }
    };

    ej.widget.observables = ej.extensions.ko;
})(window.jQuery, window.Syncfusion, window.Syncfusion.widget, window.ko);