<?php
#Vars - written at 2016-11-29
$dbhost="localhost";
$dbname="banhangonl_bho2";
$dbuser="banhangonl_bho";
$dbpass="w7a8GNPjXb";
$dbport=3306;
$dbsocket="";
$compression=1;
$backup_path="/home/banhangonl/domains/banhangonline88.com/public_html/msd1.24.4/work/backup/";
$logdatei="/home/banhangonl/domains/banhangonline88.com/public_html/msd1.24.4/work/log/mysqldump_perl.log.gz";
$completelogdatei="/home/banhangonl/domains/banhangonline88.com/public_html/msd1.24.4/work/log/mysqldump_perl.complete.log.gz";
$sendmail_call="/usr/sbin/sendmail -t -i -f banhangonl\@banhangonline88.com";
$nl="\n";
$cron_dbindex=-3;
$cron_printout=1;
$cronmail=0;
$cronmail_dump=0;
$cronmailto="";
$cronmailto_cc="";
$cronmailfrom="";
$cron_use_sendmail=1;
$cron_smtp="localhost";
$cron_smtp_port="25";
@cron_db_array=("banhangonl_bho","banhangonl_bho2","banhangonl_ho3");
@cron_dbpraefix_array=("","","");
@cron_command_before_dump=("","","");
@cron_command_after_dump=("","","");
@ftp_server=("","","");
@ftp_port=(21,21,21);
@ftp_mode=(0,0,0);
@ftp_user=("","","");
@ftp_pass=("","","");
@ftp_dir=("","","");
@ftp_timeout=(30,30,30);
@ftp_useSSL=(0,0,0);
@ftp_transfer=(0,0,0);
$mp=0;
$multipart_groesse=1048576;
$email_maxsize=3145728;
$auto_delete=0;
$max_backup_files=3;
$perlspeed=10000;
$optimize_tables_beforedump=1;
$logcompression=1;
$log_maxsize=1048576;
$complete_log=1;
$my_comment="";
?>