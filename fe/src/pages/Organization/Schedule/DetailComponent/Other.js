import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../ScheDetail.module.scss';
import clsx from 'clsx';
import scheduleServices from '../../../../services/org-services/schedule-services';
import { ToastContainer, toast } from 'react-toastify';
import { eventBus } from '../../../../services/helper';
