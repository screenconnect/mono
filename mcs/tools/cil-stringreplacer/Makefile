thisdir = tools/cil-stringreplacer
SUBDIRS =
include ../../build/rules.make

PROGRAM = cil-stringreplacer.exe
NO_INSTALL = yes

TARGET_NET_REFERENCE = $(BOOTSTRAP_BIN_PROFILE)
PROGRAM_USE_INTERMEDIATE_FILE = 1

$(topdir)/class/lib/$(PROFILE_DIRECTORY)/tmp/cil-stringreplacer.exe: $(topdir)/class/lib/$(PROFILE_DIRECTORY)/tmp/Mono.Cecil.dll

LIB_REFS += tmp/Mono.Cecil

ifdef MCS_MODE
$(topdir)/class/lib/$(PROFILE_DIRECTORY)/tmp/cil-stringreplacer.exe: $(topdir)/class/lib/$(PROFILE_DIRECTORY)/tmp/Mono.Cecil.Mdb.dll

LIB_REFS += tmp/Mono.Cecil.Mdb
endif # MCS_MODE

else # Not basic/build
LIB_REFS += Mono.Cecil

ifdef MCS_MODE
LIB_REFS += Mono.Cecil.Mdb
endif # MCS_MODE

endif # Not basic/build

include ../../build/executable.make
