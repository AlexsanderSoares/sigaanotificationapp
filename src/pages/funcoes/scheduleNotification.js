import React from 'react';

import PushNotification from 'react-native-push-notification';


const convertDate = (date) => {
    const dateSplit = date.split('/');

    return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);;
}

const scheduleNotification = (turmas) => {

    turmas.map(turma => {
        turma.atividades.map(atividade => {


            const date = convertDate(atividade.periodo.fim[0]);
            const datenow = new Date();
            const hoje = new Date(datenow.getFullYear(), datenow.getMonth(), datenow.getDate());

            if(date > hoje || date.getTime() === hoje.getTime()){
                PushNotification.localNotificationSchedule({
                    title: turma.turma + ": " + atividade.tituloss,
                    message: "Encerra em " + atividade.periodo.fim[0] + " às " + atividade.periodo.fim[1],
                    date: date,
                });
            }

            const newDateFim = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3);

            if(newDateFim > hoje || newDateFim.getTime() === hoje.getTime()){
                PushNotification.localNotificationSchedule({
                    title: turma.turma + ": " + atividade.titulo,
                    message: "Encerra em " + atividade.periodo.fim[0] + " às " + atividade.periodo.fim[1],
                    date: newDateFim,
                });
            }

            const newDateFim2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

            if(newDateFim2 > hoje || newDateFim2.getTime() === hoje.getTime()){
                PushNotification.localNotificationSchedule({
                    title: turma.turma + ": " + atividade.titulo,
                    message: "Encerra em " + atividade.periodo.fim[0] + " às " + atividade.periodo.fim[1],
                    date: newDateFim2,
                });
            }

        })
    });
}

export default scheduleNotification;