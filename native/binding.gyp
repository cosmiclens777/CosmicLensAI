{
  "targets": [
    {
      "target_name": "swe",
      "sources": [
        "addon.cc",

        "sweph.c",
        "swephlib.c",
        "swedate.c",
        "swehouse.c",
        "swemmoon.c",
        "swemplan.c",
        "swejpl.c",
        "swecl.c",
        "swehel.c"
      ],

      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],

      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],

      "defines": [
        "NAPI_CPP_EXCEPTIONS"
      ],

      "cflags_cc!": [
        "-fno-exceptions"
      ],

      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      }
    }
  ]
}