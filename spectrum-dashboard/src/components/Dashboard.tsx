import React, { useState, useEffect, useCallback } from "react";
import { useToast, Flex } from "@chakra-ui/react";
import LiveStatus from "./LiveStatus";
import { fetchSpectrumStatus } from "../api/sensors";
import Info from "./Info";
import Stats from "./Stats";
import Temperature from "./Temperature";
import ActionRequiredModal from "./ActionRequiredModal";

interface Data {
  value: number;
  timestamp: string;
}

interface SensorData {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

const initialSensorData: SensorData = {
  velocity: 0,
  altitude: 0,
  temperature: 0,
  statusMessage: "",
  isAscending: false,
  isActionRequired: false,
};

const Dashboard: React.FC = () => {
  const toast = useToast();
  const [sensorData, setSensorData] = useState(initialSensorData);
  const [altitudeData, setAltitudeData] = useState<Data[]>([]);
  const [velocityData, setVelocityData] = useState<Data[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchSpectrumStatus();
      setSensorData(data);
      setAltitudeData((prevData) => [
        ...prevData.slice(Math.max(prevData.length - 19, 0)),
        { value: data.altitude, timestamp: new Date().toLocaleTimeString() },
      ]);
      setVelocityData((prevData) => [
        ...prevData.slice(Math.max(prevData.length - 19, 0)),
        { value: data.velocity, timestamp: new Date().toLocaleTimeString() },
      ]);
      if (data.isActionRequired) {
        setIsActionModalOpen(true);
      }
    } catch (error) {
      toast({
        title: error + "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    let socket: WebSocket | null = null;

    if (isLive) {
      socket = new WebSocket(
        "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSensorData({
          temperature: data.Temperature,
          velocity: data.Velocity,
          altitude: data.Altitude,
          statusMessage: data.StatusMessage,
          isAscending: data.IsAscending,
          isActionRequired: data.IsActionRequired,
        });
        setAltitudeData((prevData) => [
          ...prevData.slice(Math.max(prevData.length - 19, 0)),
          { value: data.Altitude, timestamp: new Date().toLocaleTimeString() },
        ]);
        setVelocityData((prevData) => [
          ...prevData.slice(Math.max(prevData.length - 19, 0)),
          { value: data.Velocity, timestamp: new Date().toLocaleTimeString() },
        ]);
        if (data.IsActionRequired) {
          setIsActionModalOpen(true);
        }
      };
    } else {
      fetchData();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isLive, toast, fetchData]);

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <LiveStatus isLive={isLive} />
      <Flex
        flexDir="row"
        justifyContent="space-between"
        width="100%"
        height="100%"
        padding={5}
        bg="#343B41"
        gap={4}
      >
        <Flex flexDir="column" width="35%" gap={4}>
          <Stats data={altitudeData} color="yellow" />
          <Stats data={velocityData} color="#E29BFF" />
        </Flex>
        <Temperature temperature={sensorData.temperature} />
        <Info
          isLive={isLive}
          setIsLive={() => setIsLive(!isLive)}
          status={sensorData.statusMessage}
          isAscending={sensorData.isAscending}
          fetchData={fetchData}
        />
      </Flex>
      {isActionModalOpen && (
        <ActionRequiredModal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} />
      )}
    </Flex>
  );
};

export default Dashboard;
