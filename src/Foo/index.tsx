import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import useRequestPro from '../Hooks/useRequestPro';

function getUsername(): Promise<{ success: boolean, data: { aaa: number } }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          aaa: 555,
        },
      });
    }, 1000);
  });
}

export default ({ title }: { title: string }) => {

  const { run } = useRequestPro(getUsername, {
    manual: true,
    onSuccess: (data) => {
      console.log('onSuccess', data);
    },
  }, '配置');

  return <h1>
    <Button onClick={() => run()}>Button</Button>
    {title}
  </h1>;
};
