@ECHO OFF

rem
rem check for correct java version by parsing out put of java -version
rem we expect first line to be in format 'java version "1.8.0_161"' or 'java version "10.0.1" 2018-04-17'
rem or 'openjdk version "11-ea" 2018-09-25' and assert that version number will be 8 or 11 (if enabled)
rem

set JAVA_11_ENABLED=1

for /f "tokens=3" %%a in ('%_EXECJAVA% -version 2^>^&1') do (
  set JAVA_RAW_VERSION=%%a
  goto raw_version
)

:raw_version
set JAVA_RAW_VERSION=%JAVA_RAW_VERSION:"=%
for /f "delims=.-_ tokens=1-2" %%a in ("%JAVA_RAW_VERSION%") do (
  if /I "%%a" EQU "1" (
    set JAVA_VERSION=%%b
  ) else (
    set JAVA_VERSION=%%a
  )
  goto loaded_version
)
goto wrong_version

:loaded_version
if %JAVA_11_ENABLED%==0 (
	IF %JAVA_VERSION% NEQ 8 goto wrong_version
) else (
	IF %JAVA_VERSION% NEQ 8 (
		IF %JAVA_VERSION% NEQ 11 goto wrong_version
	)
)

goto:eof

:wrong_version
if %JAVA_11_ENABLED%==0 (
	echo **********************************************************************
	echo *******      Wrong JVM version! JIRA requires 1.8 to run.      *******
	echo **********************************************************************
) else (
	echo ****************************************************************************
	echo *******      Wrong JVM version! JIRA requires 1.8 or 11 to run.      *******
	echo ****************************************************************************
)
exit /b 1
