import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import useRequestPro from './index';
import useRequest from '@ahooksjs/use-request';

function getUsername(): Promise<{ success: boolean; data: { aaa: number } }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: false,
        data: {
          aaa: 555,
        },
      });
    }, 500);
  });
}

export default ({ title }: { title: string }) => {
  const { run } = useRequestPro(
    getUsername,
    {
      manual: true,
      onSuccess: (data) => {
        console.log('chai', data);
      },
      onError: (err) => {},
    },
    '配置',
  );

  return (
    <h1>
      <Button onClick={() => run()}>Button</Button>
    </h1>
  );
};
